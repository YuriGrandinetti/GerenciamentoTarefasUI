export interface Tarefa {
  id?: number;
  descricao: string;
  status: string;
  dataVencimento: string;
  usuarioid: number; // Inclua o campo `usuarioid`
}
