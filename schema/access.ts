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
    session?: Session;
    inputData?: InputData;
    item?: Item;
  }) => {
    if (session?.data.isAdmin) return true;
    if (session?.data.siteId && session?.data.siteId === item?.siteId)
      return true;

    if (
      session?.data.siteId &&
      session?.data.siteId &&
      inputData &&
      inputData.siteId &&
      inputData.siteId !== session.data.siteId
    )
      return false;

    return false;
  },
};
