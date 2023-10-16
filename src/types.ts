export type BaseTrialData = {
  trial_type: string;
  trial_index: number;
  time_elaped: number;
  internal_node_id: string;
};

export type HtmlKeyboardResponseTrialData = BaseTrialData & {
  stimulus: string;
  choices: string[] | "ALL_KEYS" | "NO_KEYS";
  prompt: string | null;
  stimulus_duration: number | null;
  trial_duration: number | null;
  response_ends_trial: boolean;
  response: string | null;
  rt: number;
};

export type HtmlButtonResponseTrialData = BaseTrialData & {
  stimulus: string;
  choices: string[];
  button_html: string | string[];
  prompt: string | null;
  trial_duration: number | null;
  stimulus_duration: number | null;
  margin_vertical: string;
  margin_horizontal: string;
  response_ends_trial: boolean;
  response: number;
  rt: number;
};
