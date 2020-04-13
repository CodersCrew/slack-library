interface Button {
  type: string;
  text: {
    type: string;
    text: string;
  };
  action_id: string;
  value?: string;
}

export function createButton(text: string, actionId: string, value?: string) {
  const button: Button = {
    type: "button",
    text: {
      type: "plain_text",
      text,
    },
    action_id: actionId,
  };

  if (value) {
    button.value = value;
  }

  return button;
}
