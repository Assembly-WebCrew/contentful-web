export interface AsmEvent {
  defaultBackground: EventDefaultBackground;
  endDate: string;
  eventPlace: string;
  eventTitle: string;
  logo: any;
  name: string;
  startDate: string;
}

export interface EventDefaultBackground {
  fields: {
    file: {
      url: string
    }
  };
}
