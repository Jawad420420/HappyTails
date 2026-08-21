// eikhane shob type definition ache

// animal type enum
export const AnimalType = {
  DOG: 'dog',
  CAT: 'cat',
  OTHER: 'other'
};

// pet age group enum
export const PetAgeGroup = {
  BABY: 'baby',
  YOUNG: 'young',
  ADULT: 'adult',
  SENIOR: 'senior'
};

// pet gender enum
export const PetGender = {
  MALE: 'male',
  FEMALE: 'female'
};

// application status enum
export const ApplicationStatus = {
  UNDER_REVIEW: 'Under Review',
  APPROVED: 'Approved',
  PENDING: 'Pending'
};

// page names enum
export const PageName = {
  HOME: 'home',
  SEARCH: 'search',
  PET_DETAILS: 'pet-details',
  APPLY: 'apply',
  APPLICATIONS: 'applications',
  SHELTERS: 'shelters',
  CARE_GUIDE: 'care-guide',
  SUCCESS_STORIES: 'success-stories',
  PROFILE: 'profile',
  VACCINATION_REMINDERS: 'vaccination-reminders',
  SETTINGS: 'settings'
};

/*
Pet object example:
{
  id: string,
  name: string,
  type: 'dog' | 'cat' | 'other',
  breed: string,
  age: string,
  ageGroup: 'baby' | 'young' | 'adult' | 'senior',
  gender: 'male' | 'female',
  location: string,
  isVaccinated: boolean,
  isDewormed: boolean,
  isHealthy: boolean,
  isNeutered: boolean,
  shelterName: string,
  aboutText: string,
  personality: string[],
  mainImage: string,
  galleryImages: string[],
  isFavorite: boolean
}
*/

/*
AdoptionApplication object example:
{
  id: string,
  petId: string,
  petName: string,
  petBreed: string,
  petAge: string,
  petImage: string,
  shelterName: string,
  appliedDate: string,
  status: 'Under Review' | 'Approved' | 'Pending',
  applicantName: string,
  applicantEmail: string,
  applicantPhone: string,
  applicantLocation: string,
  housingType: string,
  ownOrRent: string,
  hasFencedYard: string,
  hasOtherPets: string
}
*/

/*
FilterState object example:
{
  searchQuery: string,
  animalType: string,
  ageGroups: string[],
  breed: string,
  location: string
}
*/
