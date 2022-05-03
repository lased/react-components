export const composeClass = (classes: (string | false | undefined)[]) =>
  classes.filter((classItem) => classItem).join(' ');
