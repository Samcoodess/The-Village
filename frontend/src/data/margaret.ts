import { VillageMember } from '../types';

// Default village members for demo configuration
export const DEFAULT_VILLAGE_MEMBERS: VillageMember[] = [
  {
    id: 'vm-001',
    name: 'Susan Chen',
    role: 'family',
    relationship: 'daughter',
    phone: '+1-437-260-4814',
    availability: 'evenings',
    notes: 'Works full-time, feels guilty about not calling more',
    enabled: true,
  },
  {
    id: 'vm-002',
    name: 'Tom Bradley',
    role: 'neighbor',
    relationship: 'next-door neighbor',
    phone: '+1-437-260-4814',
    availability: 'afternoons',
    notes: 'Retired teacher, brings Margaret\'s mail often',
    enabled: false,
  },
  {
    id: 'vm-003',
    name: 'Dr. Maria Martinez',
    role: 'medical',
    relationship: 'primary care physician',
    phone: '+1-437-260-4814',
    availability: 'office hours',
    notes: 'Has been Margaret\'s doctor for 15 years',
    enabled: false,
  },
  {
    id: 'vm-004',
    name: 'Jane Thompson',
    role: 'volunteer',
    relationship: 'companion volunteer',
    phone: '+1-437-260-4814',
    availability: 'Tuesdays and Thursdays',
    notes: 'Also loves card games, matched based on interests',
    enabled: false,
  },
];

export const DEFAULT_ELDER_PHONE = '+1-437-260-4814';
export const DEFAULT_MY_PHONE = '+1-437-260-4814';
