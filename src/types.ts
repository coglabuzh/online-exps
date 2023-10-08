export type BaseTrialData = {
  trial_type: string;
  trial_index: number;
  time_elaped: number;
  internal_node_id: string;
};

export type KeyboardTrialData = BaseTrialData & {
  response: string;
  rt: number;
  stimulus: string;
};
