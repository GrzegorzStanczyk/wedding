export const debounce = (delay: number = 300) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const key = `__timeout__${propertyKey}`;
    const original = descriptor.value;

    descriptor.value = function (...args: any) {
      clearTimeout(this[key as keyof PropertyDescriptor]);
      this[key as keyof PropertyDescriptor] = setTimeout(
        () => original.apply(this, args),
        delay
      );
    };

    return descriptor;
  };
};
