// Google Calendar API service
const GOOGLE_CALENDAR_API_KEY = process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY;
const CALENDAR_ID = process.env.REACT_APP_CALENDAR_ID;

export interface TimeSlot {
  id: string;
  start: string;
  end: string;
  title: string;
  available: boolean;
}

export interface CalendarEvent {
  id: string;
  summary: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
}

export class CalendarService {
  private baseUrl = 'https://www.googleapis.com/calendar/v3';

  async getAvailableSlots(startDate: string, endDate: string): Promise<TimeSlot[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/calendars/${CALENDAR_ID}/events?key=${GOOGLE_CALENDAR_API_KEY}&timeMin=${startDate}&timeMax=${endDate}&singleEvents=true&orderBy=startTime`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch calendar events');
      }

      const data = await response.json();
      const events: CalendarEvent[] = data.items || [];

      // Generate available time slots based on business hours and existing events
      return this.generateAvailableSlots(startDate, endDate, events);
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      return this.getMockAvailableSlots();
    }
  }

  private generateAvailableSlots(startDate: string, endDate: string, existingEvents: CalendarEvent[]): TimeSlot[] {
    const slots: TimeSlot[] = [];
    const businessHours = [
      { start: '09:00', end: '17:00' }, // 9 AM to 5 PM
    ];

    const start = new Date(startDate);
    const end = new Date(endDate);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      // Skip weekends
      if (d.getDay() === 0 || d.getDay() === 6) continue;

      businessHours.forEach(hours => {
        const slotStart = new Date(d);
        const [startHour, startMinute] = hours.start.split(':').map(Number);
        slotStart.setHours(startHour, startMinute, 0, 0);

        const slotEnd = new Date(d);
        const [endHour, endMinute] = hours.end.split(':').map(Number);
        slotEnd.setHours(endHour, endMinute, 0, 0);

        // Generate hourly slots
        for (let time = new Date(slotStart); time < slotEnd; time.setHours(time.getHours() + 1)) {
          const slotEndTime = new Date(time);
          slotEndTime.setHours(time.getHours() + 1);

          const isAvailable = !existingEvents.some(event => {
            const eventStart = new Date(event.start.dateTime);
            const eventEnd = new Date(event.end.dateTime);
            return (time >= eventStart && time < eventEnd) || (slotEndTime > eventStart && slotEndTime <= eventEnd);
          });

          slots.push({
            id: `${time.toISOString()}-${slotEndTime.toISOString()}`,
            start: time.toISOString(),
            end: slotEndTime.toISOString(),
            title: `${time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${slotEndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
            available: isAvailable
          });
        }
      });
    }

    return slots;
  }

  private getMockAvailableSlots(): TimeSlot[] {
    // Mock data for development
    const today = new Date();
    const slots: TimeSlot[] = [];

    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) continue;

      // Add morning and afternoon slots
      const morningSlots = [
        { start: '09:00', end: '10:00' },
        { start: '10:00', end: '11:00' },
        { start: '11:00', end: '12:00' },
      ];

      const afternoonSlots = [
        { start: '14:00', end: '15:00' },
        { start: '15:00', end: '16:00' },
        { start: '16:00', end: '17:00' },
      ];

      [...morningSlots, ...afternoonSlots].forEach(slot => {
        const startTime = new Date(date);
        const [startHour, startMinute] = slot.start.split(':').map(Number);
        startTime.setHours(startHour, startMinute, 0, 0);

        const endTime = new Date(date);
        const [endHour, endMinute] = slot.end.split(':').map(Number);
        endTime.setHours(endHour, endMinute, 0, 0);

        slots.push({
          id: `${startTime.toISOString()}-${endTime.toISOString()}`,
          start: startTime.toISOString(),
          end: endTime.toISOString(),
          title: `${slot.start} - ${slot.end}`,
          available: Math.random() > 0.3 // 70% chance of being available
        });
      });
    }

    return slots;
  }

  async bookSlot(slotId: string, userDetails: { name: string; email: string; phone: string }): Promise<boolean> {
    try {
      // This would integrate with your booking system
      console.log('Booking slot:', slotId, 'for user:', userDetails);
      
      // In a real implementation, you would:
      // 1. Create a calendar event
      // 2. Send confirmation emails
      // 3. Update your database
      
      return true;
    } catch (error) {
      console.error('Error booking slot:', error);
      return false;
    }
  }
}

export const calendarService = new CalendarService();
