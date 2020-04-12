export function createButton(text: string, actionId: string, value: string) {
  return {
    type: "button",
    text: {
      type: "plain_text",
      text,
    },
    action_id: actionId,
    value,
  };
}
