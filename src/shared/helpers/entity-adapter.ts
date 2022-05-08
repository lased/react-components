type EntityIdType = string | number;
interface IEntityAdapterOptions<T> {
  selectId?: (entity: T) => EntityIdType;
}

export const createEntityAdapter = <
  T extends { id: EntityIdType } | EntityIdType
>({ selectId }: IEntityAdapterOptions<T> = {}) => {
  const returnId = (entity: T | EntityIdType) =>
    typeof entity === 'object' ? selectId?.(entity) || entity.id : entity;

  return {
    add: (state: T[], ...entities: T[]) => [...state, ...entities],
    remove: (state: T[], ...entities: (T | EntityIdType)[]) => {
      const ids = entities.map(returnId);

      return state.filter((entity) => {
        const id = returnId(entity);

        return !ids.includes(id);
      });
    },
    update: (state: T[], ...entities: T[]) => {
      const ids = entities.map(returnId);

      return state.filter((entity) => {
        const id = returnId(entity);
        const indexId = ids.findIndex((entityId) => entityId === id);

        if (indexId >= 0) {
          const updatedEntity = entities[indexId];

          if (typeof entity === 'object' && typeof updatedEntity === 'object') {
            return { ...entity, ...updatedEntity };
          }

          return updatedEntity;
        }

        return entity;
      });
    }
  };
};
