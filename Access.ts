type Session = {
  data: {
    id: string;
    isAdmin: boolean;
    museumId: string;
  };
};

type Item = {
  id: string;
  museumId: string;
};

type InputData = {
  id: string;
  museumId: string;
};

export const OperationAccess = {
  adminOnly: ({ session }: { session: Session }) => session?.data.isAdmin,
  adminOrMuseumCuratorOnly: ({ session }: { session: Session }) =>
    session?.data.isAdmin || session?.data.museumId,
  anyone: () => true,
};

export const FilterAccess = {
  limitMuseumCurator: ({ session }: { session: Session }) => {
    if (session?.data.museumId) {
      return {
        museumId: { equals: session.data.museumId },
      };
    }
    return true;
  },
  adminOrMuseumCuratorOnly: ({ session }: { session: Session }) =>
    session?.data.isAdmin || session?.data.museumId,
};

export const ItemAccess = {
  adminOrMuseumCuratorOnly: ({
    session,
    inputData,
    item,
  }: {
    session: Session;
    inputData: InputData;
    item: Item;
  }) => {
    if (session?.data.isAdmin) return true;

    const museumId = session?.data.museumId;
    if (museumId) {
      if (inputData) {
        if (inputData.museumId !== museumId) return false;
        if (item && item.museumId === museumId) return true;
        return true;
      } else if (item) {
        return item.museumId === museumId;
      }
    }
    return false;
  },
};
