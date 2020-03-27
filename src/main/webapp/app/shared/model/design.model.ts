export interface IDesign {
  id?: any;
  name?: string;
  description?: string;
  username?: string;
}

export const defaultValue: Readonly<IDesign> = {
  id: '',
  name: '',
  description: '',
  username: ''
};
