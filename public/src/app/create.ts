export class Create {
  constructor (
    public category: string = "",
    public title: string = "",
    public start_date = null,
    public end_date = null,
    public description: string = "",
    public _Owners = [],
    public _Members = [],
    public _Invitees = [],
    public messages = []
  ) {}
}
