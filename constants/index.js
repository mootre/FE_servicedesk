
export const sidebarLinks = [
  {
    imgURL: "/assets/home.svg",
    route: "/",
    state: "main",
    label: "Dashboard",
    level: "other",
  },
  {
    imgURL: "/assets/user.svg",
    route: "/account",
    state: "main",
    label: "AssetAccount",
    level: "account",
  },
  {
    imgURL: "/assets/request.svg",
    route: "",
    state: "main",
    label: "Transection",
    level: "it",
  },
  {
    imgURL: "/assets/hardware.svg",
    route: "/asset",
    state: "sub",
    label: "Asset",
    level: "it",
  },
  {
    imgURL: "/assets/database.svg",
    route: "/master",
    state: "sub",
    label: "Asset Master",
    level: "it",
  },
  {
    imgURL: "/assets/assign.svg",
    route: "/assign",
    state: "sub",
    label: "Assigning Asset",
    level: "it",
  },
  {
    imgURL: "/assets/ticket.svg",
    route: "/ticket",
    state: "main",
    label: "Ticket",
    level: "other",
  },
  {
    imgURL: "/assets/user.svg",
    route: "/profile",
    state: "main",
    label: "Profile",
    level: "other",
  },
];

export const tabbar_asset = [
  {
    route: "/asset/[id]",
    label: "Asset Details",
  },
  {
    route: "/asset/component",
    label: "Component",
  },
  {
    route: "/asset/transecton",
    label: "Transection",
  }
];

export const profileTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "replies", label: "Replies", icon: "/assets/members.svg" },
  { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
];

export const communityTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "members", label: "Members", icon: "/assets/members.svg" },
  { value: "requests", label: "Requests", icon: "/assets/request.svg" },
];
