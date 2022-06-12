type Session = {
  data: {
    id: string;
    isAdmin: boolean;
    siteId: string;
  };
};

type Item = {
  id: string;
  siteId: string;
};

type InputData = {
  id: string;
  siteId: string;
};

// export const OperationAccess = {
//   adminOnly: ({ session }: { session: Session }) => session?.data.isAdmin,
//   adminOrSiteCuratorOnly: ({ session }: { session: Session }) =>
//     session?.data.isAdmin || session?.data.siteId.length > 0,
//   anyone: () => true,
// };

export const OperationAccess = {
  adminOnly: ({ session }: { session: Session }) => session?.data.isAdmin,
  adminOrSiteCuratorOnly: ({ session }: { session: Session }) =>
    !!session?.data.isAdmin || !!session?.data.siteId,
  anyone: () => true,
};

export const FilterAccess = {
  limitSiteCurator: ({ session }: { session: Session }) => {
    if (session?.data.siteId) {
      return {
        siteId: { equals: session.data.siteId },
      };
    }
    return true;
  },
  adminOrSiteCuratorOnly: ({ session }: { session: Session }) =>
    session?.data.isAdmin || session?.data.siteId.length > 0,
};

export const ItemAccess = {
  adminOrSiteCuratorOnly: ({
    session,
    inputData,
    item,
  }: {
    session: Session;
    inputData: InputData;
    item: Item;
  }) => {
    if (session?.data.isAdmin) return true;

    const siteId = session?.data.siteId;
    if (siteId) {
      if (inputData) {
        if (inputData.siteId !== siteId) return false;
        if (item && item.siteId === siteId) return true;
        return true;
      } else if (item) {
        return item.siteId === siteId;
      }
    }
    return false;
  },
};
