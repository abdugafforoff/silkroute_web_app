import { ref } from "vue";

const isOpen = ref(false)

export function useSidebar() {
  return {
    isOpen
  };
}

export const navItems = [
  {
    id: 1,
    title: "My Orders",
    to: "/my-orders",
    icon: "mdi:home",
    role: "USER"
  },
  {
    id: 1,
    title: "Employee",
    to: "/employee",
    icon: "mdi:data",
    role: "ADMIN"
  },
  {
    id: 2,
    header: "Asosi menyu",
  },
  {
    id:3,
    title:"Profile",
    icon: "mdi:account",
    to: "/employee",
    role: "USER"

  },
  {
    id: 3,
    title: "Cards",
    icon: "mdi:cards",
    childNav: [
      {
        id: 1,
        title: "Applications",
        to: "/applications",
        icon: "mdi:application",
      },
      {
        id: 2,
        title: "Products",
        to: "/products",
        icon: "mdi:progress-upload",
      },
    ],
  },
  {
    id: 1,
    title: "Tables",
    to: "/tables",
    icon: "mdi:data",
    role: "ADMIN"
  },
]
