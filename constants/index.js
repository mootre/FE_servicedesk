export const sidebarLinks = [
  {
    imgURL: "/assets/home.svg",
    route: "/",
    label: "Dashboard",
  },
  {
    imgURL: "/assets/hardware.svg",
    route: "/asset",
    label: "Asset",
  },
  {
    imgURL: "/assets/database.svg",
    route: "/master",
    label: "Asset Master",
  },
  {
    imgURL: "/assets/assign.svg",
    route: "/assign",
    label: "Assigning Asset",
  },
  {
    imgURL: "/assets/ticket.svg",
    route: "/ticket",
    label: "Ticket",
  },
  {
    imgURL: "/assets/search.svg",
    route: "/search",
    label: "Search",
  },
  {
    imgURL: "/assets/heart.svg",
    route: "/activity",
    label: "Activity",
  },
  {
    imgURL: "/assets/create.svg",
    route: "/create-thread",
    label: "Create Thread",
  },
  {
    imgURL: "/assets/community.svg",
    route: "/communities",
    label: "Communities",
  },
  {
    imgURL: "/assets/user.svg",
    route: "/profile",
    label: "Profile",
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
