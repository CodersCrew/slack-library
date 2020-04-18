interface SelectProps {
  placeholder: string;
  label: string;
  options: string[];
}

export function createSelect(props: SelectProps) {
  const options = props.options.map((option) => ({
    text: {
      type: "plain_text",
      text: option,
    },
    value: option,
  }));

  return {
    type: "input",
    element: {
      type: "static_select",
      placeholder: {
        type: "plain_text",
        text: props.placeholder,
        emoji: true,
      },
      options,
    },
    label: {
      type: "plain_text",
      text: props.label,
      emoji: true,
    },
  };
}
