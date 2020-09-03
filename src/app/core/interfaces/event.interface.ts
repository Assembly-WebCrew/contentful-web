export interface AsmEvent {
  defaultBackground: EventDefaultBackground;
  endDate: string;
  eventPlace: string;
  eventTitle: string;
  isPublic?: boolean;
  logo: any;
  name: string;
  startDate: string;
  ticketsLink?: string;
}

export interface EventDefaultBackground {
  fields: {
    file: {
      url: string
    }
  };
}
