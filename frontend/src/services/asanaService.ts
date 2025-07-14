import asana from 'asana';

const client = asana.Client.create({ defaultHeaders: { 'Asana-Enable': 'new_user_task_lists' } }).useAccessToken(process.env.REACT_APP_ASANA_ACCESS_TOKEN || '');

export interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  location: string;
  occupation: string;
  education: string;
  culturalBackground: string;
  lifeGoals: string;
  values: string;
  relationshipHistory: string;
  hasChildren: string;
  wantsChildren: string;
  clientType: string;
  executiveDetails?: string;
  creativeDetails?: string;
  preferences: string[];
  dealbreakers: string[];
  additionalPreferences: string;
  ageRangeMin: string;
  ageRangeMax: string;
  referralSource: string;
  referralDetails?: string;
  referralOther?: string;
  eventAttended: string;
  expectations: string;
  timeframe: string;
  privacyConsent: boolean;
}

export const createProjectFromRegistration = async (data: RegistrationData) => {
  try {
    const workspaceId = process.env.REACT_APP_ASANA_WORKSPACE_ID || '';
    const projectName = `${data.firstName} ${data.lastName} - Matchmaking Client`;
    const projectNotes = `New client registration for ${data.firstName} ${data.lastName}\n\nEmail: ${data.email}\nPhone: ${data.phone}\nLocation: ${data.location}\nOccupation: ${data.occupation}\nClient Type: ${data.clientType}\nTimeframe: ${data.timeframe}`;
    
    const project = await client.projects.create({
      name: projectName,
      notes: projectNotes,
      workspace: workspaceId,
    });
    
    // Create initial tasks for the project
    await createInitialTasks(project.gid, data);
    
    return project;
  } catch (error) {
    console.error('Error creating Asana project:', error);
    throw error;
  }
};

const createInitialTasks = async (projectId: string, data: RegistrationData) => {
  const tasks = [
    {
      name: 'Initial Client Review',
      notes: `Review ${data.firstName} ${data.lastName}'s registration information and assess fit for our service.\n\nKey Details:\n- Age: ${calculateAge(data.dateOfBirth)}\n- Location: ${data.location}\n- Occupation: ${data.occupation}\n- Education: ${data.education}\n- Referral Source: ${data.referralSource}`,
      projects: [projectId],
    },
    {
      name: 'Background Analysis',
      notes: `Detailed analysis of client's background and values:\n\nCultural Background:\n${data.culturalBackground}\n\nLife Goals:\n${data.lifeGoals}\n\nCore Values:\n${data.values}\n\nRelationship History:\n${data.relationshipHistory}\n\nChildren Status:\n- Has Children: ${data.hasChildren}\n- Wants Children: ${data.wantsChildren}\n\nClient Type: ${data.clientType}\n${data.executiveDetails ? `Executive Details: ${data.executiveDetails}` : ''}\n${data.creativeDetails ? `Creative Details: ${data.creativeDetails}` : ''}`,
      projects: [projectId],
    },
    {
      name: 'Preferences & Standards Review',
      notes: `Client's preferences and deal-breakers:\n\nPreferred Qualities:\n${data.preferences.join(', ')}\n\nDeal-breakers:\n${data.dealbreakers.join(', ')}\n\nAge Range: ${data.ageRangeMin} - ${data.ageRangeMax}\n\nAdditional Preferences:\n${data.additionalPreferences}`,
      projects: [projectId],
    },
    {
      name: 'Initial Consultation Scheduling',
      notes: `Schedule initial consultation with ${data.firstName} ${data.lastName}\n\nContact Information:\n- Email: ${data.email}\n- Phone: ${data.phone}\n\nExpectations:\n${data.expectations}\n\nTimeframe: ${data.timeframe}`,
      projects: [projectId],
    },
    {
      name: 'Profile Creation',
      notes: `Create comprehensive matchmaking profile for ${data.firstName} ${data.lastName}`,
      projects: [projectId],
    },
    {
      name: 'Database Search',
      notes: `Search existing database for potential matches based on client preferences`,
      projects: [projectId],
    },
  ];

  for (const task of tasks) {
    try {
      await client.tasks.create(task);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }
};

const calculateAge = (dateOfBirth: string): number => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

export const createProject = async (name: string, notes: string) => {
  try {
    const workspaceId = process.env.REACT_APP_ASANA_WORKSPACE_ID || '';
    const project = await client.projects.create({
      name,
      notes,
      workspace: workspaceId,
    });
    return project;
  } catch (error) {
    console.error('Error creating Asana project:', error);
    throw error;
  }
};

export const createTask = async (name: string, notes: string, projectId: string) => {
  try {
    const task = await client.tasks.create({
      name,
      notes,
      projects: [projectId],
    });
    return task;
  } catch (error) {
    console.error('Error creating Asana task:', error);
    throw error;
  }
};
