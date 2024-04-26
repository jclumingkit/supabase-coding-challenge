import { Database } from "./database";

export type QuestionTableRow =
  Database["public"]["Tables"]["question_table"]["Row"];

export type QuestionTableInsert =
  Database["public"]["Tables"]["question_table"]["Insert"];

export type QuestionTableUpdate =
  Database["public"]["Tables"]["question_table"]["Update"];
