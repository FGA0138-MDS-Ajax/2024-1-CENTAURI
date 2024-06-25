export class Match {
  campeonato: string;
  data_hora: Date;
  time1: string;
  time2: string;
  channels: string[];

  constructor(
    campeonato: string,
    data_hora: string,
    time1: string,
    time2: string,
    channels: string[]
  ) {
    this.campeonato = campeonato;
    this.data_hora = this.parseDate(data_hora);
    this.time1 = time1;
    this.time2 = time2;
    this.channels = channels;
  }

  private parseDate(dateString: string): Date {
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  }

  public formatDate(): string {
    const day = String(this.data_hora.getDate()).padStart(2, '0');
    const month = String(this.data_hora.getMonth() + 1).padStart(2, '0');
    const year = this.data_hora.getFullYear();
    const hours = String(this.data_hora.getHours()).padStart(2, '0');
    const minutes = String(this.data_hora.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  }
}
  