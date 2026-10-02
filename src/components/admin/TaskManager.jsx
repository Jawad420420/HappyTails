import React, { useState } from 'react';
import { MapPin, Calendar, PlusCircle } from 'lucide-react';
import { createTask, assignTask, reviewTask, closeTask } from '../../lib/api';

const STATUSES = ['Open', 'Assigned', 'Submitted', 'Completed', 'Closed'];
const BADGE = {
  Open: 'bg-blue-100 text-blue-800',
  Assigned: 'bg-purple-100 text-purple-800',
  Submitted: 'bg-amber-100 text-amber-800',
  Completed: 'bg-emerald-100 text-emerald-800',
  Closed: 'bg-gray-200 text-gray-700',
};
const fmtDate = (d) => (d ? new Date(d).toLocaleDateString() : '—');
const input = 'w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#426306]';
const btn = 'px-3.5 py-2 rounded-xl text-xs font-bold transition text-white';

export default function TaskManager({ tasks, setTasks, flashMessage }) {
  const [form, setForm] = useState({ title: '', description: '', location: '', dueDate: '' });
  const [filter, setFilter] = useState('All');
  const [reviewMsgs, setReviewMsgs] = useState({});

  const replace = (t) => setTasks((prev) => prev.map((x) => (x._id === t._id ? t : x)));

  const run = async (fn, msg) => {
    try {
      replace(await fn());
      flashMessage(msg);
    } catch (err) {
      alert(err.message || 'Task action failed');
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const t = await createTask(form);
      setTasks((prev) => [t, ...prev]);
      setForm({ title: '', description: '', location: '', dueDate: '' });
      flashMessage(`Task "${t.title}" created`);
    } catch (err) {
      alert(err.message || 'Failed to create task');
    }
  };

  const handleReview = (task, action) => {
    const message = (reviewMsgs[task._id] || '').trim();
    if (action === 'reject' && !message) return alert('Please write what needs to change.');
    run(
      () => reviewTask(task._id, action, message),
      action === 'complete' ? 'Task marked completed' : 'Changes requested from volunteer'
    );
  };

  const handleClose = (task) => {
    if (!window.confirm(`Close task "${task.title}"?`)) return;
    run(() => closeTask(task._id), 'Task closed');
  };

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const shown = filter === 'All' ? tasks : tasks.filter((t) => t.status === filter);

  const proof = (t) =>
    t.proofImage && (
      <a href={t.proofImage} target="_blank" rel="noreferrer" className="block w-fit">
        <img src={t.proofImage} alt="Proof" className="h-40 rounded-xl border border-gray-200 object-cover hover:opacity-90" />
      </a>
    );

  return (
    <div className="space-y-6">
      <form onSubmit={handleCreate} className="bg-gray-50/70 border border-gray-200/60 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <h3 className="sm:col-span-2 font-bold text-gray-900 text-base">Create Volunteer Task</h3>
        <input required placeholder="Title" value={form.title} onChange={set('title')} className={input} />
        <input placeholder="Location" value={form.location} onChange={set('location')} className={input} />
        <textarea placeholder="Description" value={form.description} onChange={set('description')} rows={2} className={`${input} sm:col-span-2`} />
        <input type="date" value={form.dueDate} onChange={set('dueDate')} className={input} />
        <button type="submit" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#426306] text-white font-bold hover:bg-[#344e05] transition text-xs sm:text-sm">
          <PlusCircle className="w-4 h-4" /> Create Task
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        {['All', ...STATUSES].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
              filter === s ? 'bg-[#426306] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {s === 'Submitted' ? 'Submitted (Needs review)' : s} ({s === 'All' ? tasks.length : tasks.filter((t) => t.status === s).length})
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="text-gray-500 text-sm py-8 text-center">No tasks found.</p>
      ) : (
        shown.map((t) => (
          <div key={t._id} className="bg-gray-50/70 border border-gray-200/60 rounded-2xl p-5 space-y-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-gray-900 text-base">{t.title}</h3>
                {t.description && <p className="text-sm text-gray-600 mt-1">{t.description}</p>}
                <p className="text-xs text-gray-500 mt-2 flex flex-wrap gap-4">
                  {t.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{t.location}</span>}
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Due {fmtDate(t.dueDate)}</span>
                  {t.assignedTo && <span>Assignee: <b className="text-gray-800">{t.assignedTo.name}</b> ({t.assignedTo.email})</span>}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${BADGE[t.status] || BADGE.Closed}`}>{t.status}</span>
                {(t.status === 'Open' || t.status === 'Assigned') && (
                  <button type="button" onClick={() => handleClose(t)} className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gray-200 hover:bg-gray-300 text-gray-700 transition">
                    Close
                  </button>
                )}
              </div>
            </div>

            {t.status === 'Open' && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Interested volunteers</p>
                {t.interested?.length ? (
                  t.interested.map((u) => (
                    <div key={u._id} className="p-3 bg-white rounded-xl flex items-center justify-between text-xs border border-gray-100">
                      <span className="font-bold text-gray-900">{u.name} <span className="font-normal text-gray-500">({u.email})</span></span>
                      <button type="button" onClick={() => run(() => assignTask(t._id, u._id), `Task assigned to ${u.name}`)} className={`${btn} bg-emerald-600 hover:bg-emerald-700`}>
                        Select
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-500">No volunteers interested yet.</p>
                )}
              </div>
            )}

            {t.status === 'Assigned' && t.reviewMessage && (
              <p className="text-xs bg-amber-50 text-amber-800 p-3 rounded-xl"><b>Changes requested:</b> {t.reviewMessage}</p>
            )}

            {t.status === 'Submitted' && (
              <div className="space-y-3">
                {proof(t)}
                {t.submissionNote && <p className="text-sm text-gray-700"><b>Note:</b> {t.submissionNote}</p>}
                <p className="text-xs text-gray-500">Submitted {fmtDate(t.submittedAt)}</p>
                <textarea
                  rows={2}
                  placeholder="Review message (required to request changes)"
                  value={reviewMsgs[t._id] || ''}
                  onChange={(e) => setReviewMsgs({ ...reviewMsgs, [t._id]: e.target.value })}
                  className={input}
                />
                <div className="flex gap-2">
                  <button type="button" onClick={() => handleReview(t, 'complete')} className={`${btn} bg-emerald-600 hover:bg-emerald-700`}>Mark Completed</button>
                  <button type="button" onClick={() => handleReview(t, 'reject')} className={`${btn} bg-red-600 hover:bg-red-700`}>Request Changes</button>
                </div>
              </div>
            )}

            {t.status === 'Completed' && (
              <div className="space-y-2">
                {proof(t)}
                {t.reviewMessage && <p className="text-sm text-gray-700"><b>Review:</b> {t.reviewMessage}</p>}
                <p className="text-xs text-emerald-700 font-semibold">Completed {fmtDate(t.completedAt)}</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
