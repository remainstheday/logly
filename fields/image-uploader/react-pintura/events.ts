const isEvent = (key: any) => /^on[A-Z]/.test(key);

const getEventsFromProps = (props: any) =>
  Object.keys(props).filter(isEvent).map(getEventFromKey);

const getEventFromKey = (key: any) => key.substr(2).toLowerCase();

export const unsub = (component: any, events: any = undefined) => {
  // @ts-ignore
  (component.unsubs || [])
    // events not supplied, or event is in events list
    // @ts-ignore
    .filter(([event]) => !events || events.includes(event))
    // @ts-ignore
    .forEach(([, unsub]) => unsub());
};

export const sub = (component: any, props: any) => {
  // unsub existing subscriptions
  unsub(component, getEventsFromProps(props));

  // subscribe
  component.unsubs = Object.keys(props)
    .filter(isEvent)
    .map((key) => {
      const type = getEventFromKey(key);
      return [type, component.editor.on(type, props[key])];
    });
};
