import internal from "stream";

export interface Issue {
  id: string;
  name: string;
  fuel: '92' | '95' | '98' | '100' | 'diesel';
  value: string;
}
