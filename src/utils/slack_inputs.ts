interface InputProps {
  name: string;
  blockId: string;
  minLength?: number;
  multiline?: boolean;
}

export function createInput(props: InputProps) {
  return {
    type: "input",
    block_id: props.blockId,
    element: {
      type: "plain_text_input",
      action_id: "input",
      min_length: props.minLength || 0,
      multiline: props.multiline || false,
    },
    label: {
      type: "plain_text",
      text: props.name,
      emoji: true,
    },
  };
}
