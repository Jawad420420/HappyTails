import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardList, Calendar, MapPin, ArrowRight, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { toggleTaskInterest, submitTask } from '../../lib/api';
import { getStoredUser } from '../../lib/auth';

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

const STATUS_STYLES = {
  Open: 'bg-blue-100 text-blue-800 border-blue-200',
  Assigned: 'bg-amber-100 text-amber-800 border-amber-200',
  Submitted: 'bg-purple-100 text-purple-800 border-purple-200',
  Completed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  Closed: 'bg-gray-200 text-gray-700 border-gray-300',
};

const idOf = (x) => (x && typeof x === 'object' ? x._id || x.id : x);
const fmtDate = (d) => (d ? new Date(d).toLocaleDateString(undefined, { dateStyle: 'medium' }) : null);

const btn = 'px-4 py-2 rounded-xl text-xs font-bold transition disabled:opacity-50';

function SubmitForm({ task, onSubmit, busy }) {
  const [image, setImage] = useState('');
  const [note, setNote] = useState('');
  const [fileError, setFileError] = useState('');

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    setImage('');
    setFileError('');
    if (!file) return;
    if (!file.type.startsWith('image/')) return setFileError('Please choose an image file.');
    if (file.size > MAX_IMAGE_BYTES) return setFileError('Image must be 5MB or smaller.');
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (image) onSubmit(task._id, { proofImage: image, note });
      }}
      className="mt-4 space-y-3 bg-white p-4 rounded-xl border border-gray-200/60"
    >
      <label className="block text-xs font-bold text-gray-700">
        Proof photo *
        <input
          type="file"
          accept="image/*"
          required
          onChange={handleFile}
          className="mt-1 block w-full text-xs text-gray-600 file:mr-3 file:px-3 file:py-1.5 file:rounded-lg file:border-0 file:bg-[#e8f2d8] file:text-[#426306] file:font-bold"
        />
      </label>
      {fileError && <p className="text-xs text-red-600">{fileError}</p>}
      {image && <img src={image} alt="Proof preview" className="w-40 h-40 rounded-xl object-cover border border-gray-200" />}
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Optional note for the admin"
        rows={2}
        className="w-full text-xs p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#426306]"
      />
      <button type="submit" disabled={busy || !image} className={`${btn} bg-[#426306] text-white hover:bg-[#344e05]`}>
        {busy ? 'Submitting...' : 'Submit Task'}
      </button>
    </form>
  );
}

export default function VolunteerTasks({ isVolunteer, tasks, onTaskUpdate }) {
  const me = getStoredUser();
  const myId = me?.id || me?._id;
  const mine = (t) => !!myId && idOf(t.assignedTo) === myId;
  const interested = (t) => (t.interested || []).some((u) => idOf(u) === myId);

  const filters = [
    ['open', 'Open', (t) => t.status === 'Open' && !interested(t)],
    ['applied', 'Applied', (t) => t.status === 'Open' && interested(t)],
    ['todo', 'My Tasks', (t) => t.status === 'Assigned' && mine(t)],
    ['review', 'Awaiting Approval', (t) => t.status === 'Submitted' && mine(t)],
    [
      'closed',
      'Closed',
      (t) => t.status !== 'Open' && (mine(t) ? ['Completed', 'Closed'].includes(t.status) : interested(t)),
    ],
    ['all', 'All', () => true],
  ];

  const [filter, setFilter] = useState(() => (tasks.some(filters[2][2]) ? 'todo' : 'open'));
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState('');

  if (!isVolunteer) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
        <ClipboardList className="w-10 h-10 text-gray-300 mx-auto mb-3" />
        <h3 className="font-bold text-gray-900 mb-1 text-base">Volunteer Tasks Are Almost Yours</h3>
        <p className="text-gray-500 text-xs mb-4">
          Tasks become available once your volunteer application is approved.
        </p>
        <Link
          to="/volunteer"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#426306] text-white text-xs font-bold rounded-xl hover:bg-[#344e05] transition"
        >
          Volunteer Application
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  const run = async (id, fn) => {
    setBusyId(id);
    setError('');
    try {
      onTaskUpdate(await fn());
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setBusyId(null);
    }
  };

  const handleSubmit = (id, payload) => run(id, () => submitTask(id, payload));
  const visible = tasks.filter(filters.find(([key]) => key === filter)[2]);

  const renderAction = (t) => {
    const busy = busyId === t._id;
    if (t.status === 'Open') {
      const on = interested(t);
      return (
        <button
          type="button"
          disabled={busy}
          onClick={() => run(t._id, () => toggleTaskInterest(t._id))}
          className={`${btn} mt-4 ${
            on ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100' : 'bg-[#426306] text-white hover:bg-[#344e05]'
          }`}
        >
          {busy ? 'Saving...' : on ? 'Withdraw Interest' : "I'm Interested"}
        </button>
      );
    }
    if (!mine(t)) {
      return interested(t) ? (
        <p className="mt-3 text-xs font-semibold text-gray-500">
          {t.assignedTo ? 'Not selected — this task went to another volunteer.' : 'Closed'}
        </p>
      ) : null;
    }
    const proof = t.proofImage && (
      <img src={t.proofImage} alt="Submitted proof" className="w-40 h-40 rounded-xl object-cover border border-gray-200 mt-3" />
    );
    if (t.status === 'Assigned') {
      return (
        <>
          {t.reviewMessage && (
            <div className="mt-3 flex gap-2 bg-amber-50 border border-amber-200 text-amber-900 p-3 rounded-xl text-xs font-semibold">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
              Admin requested changes: {t.reviewMessage}
            </div>
          )}
          <SubmitForm task={t} onSubmit={handleSubmit} busy={busy} />
        </>
      );
    }
    if (t.status === 'Submitted') {
      return (
        <>
          {proof}
          <p className="mt-2 text-xs font-semibold text-purple-700 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> Waiting for admin review
          </p>
        </>
      );
    }
    if (t.status === 'Completed') {
      return (
        <>
          {proof}
          <p className="mt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" /> Completed {fmtDate(t.completedAt) && `on ${fmtDate(t.completedAt)}`}
          </p>
          {t.reviewMessage && (
            <p className="text-xs text-gray-600 mt-2 bg-white p-2.5 rounded-xl border border-gray-200/60 max-w-xl italic">
              "{t.reviewMessage}"
            </p>
          )}
        </>
      );
    }
    return <p className="mt-3 text-xs font-semibold text-gray-500">Closed</p>;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {filters.map(([key, label, pred]) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition ${
              filter === key
                ? 'bg-[#426306] text-white border-[#426306]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-[#426306]'
            }`}
          >
            {label} ({tasks.filter(pred).length})
          </button>
        ))}
      </div>

      {error && <div className="bg-red-50 text-red-700 p-4 rounded-xl text-xs font-medium">{error}</div>}

      {visible.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-2xl border border-gray-100">
          <ClipboardList className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-xs">No tasks here right now.</p>
        </div>
      ) : (
        visible.map((t) => (
          <div key={t._id} className="bg-gray-50/70 rounded-2xl border border-gray-200/60 p-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
              <h3 className="font-bold text-gray-900 text-base">{t.title}</h3>
              <span
                className={`self-start px-3 py-1 rounded-full text-xs font-bold border ${STATUS_STYLES[t.status] || STATUS_STYLES.Closed}`}
              >
                {t.status}
              </span>
            </div>
            {t.description && <p className="text-xs text-gray-600 mt-2 max-w-2xl">{t.description}</p>}
            <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-500">
              {t.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  {t.location}
                </span>
              )}
              {t.dueDate && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  Due: {fmtDate(t.dueDate)}
                </span>
              )}
            </div>
            {renderAction(t)}
          </div>
        ))
      )}
    </div>
  );
}
