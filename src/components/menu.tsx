import Link from "next/link";
import { Menu as HeadlessMenu, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface MenuProps {
  name: string;
  image: string;
  children: React.ReactNode;
}

const Menu = ({ children, name, image }: MenuProps) => {

  const items = [{ label: "Workout", href: "/workout" }];

  return (
    <div className="container mx-auto p-4">
      <HeadlessMenu as="div" className="relative inline-block text-left">
        <div>
          <HeadlessMenu.Button className="flex w-full justify-center items-center gap-2 rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {name}{" "}
            <img
              src={image}
              alt="avatar"
              className="w-10 h-10 rounded-full mx-auto"
            />
          </HeadlessMenu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <HeadlessMenu.Items className="absolute right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {items.map((item) => (
                <HeadlessMenu.Item key={item.label}>
                  {({ active }) => (
                    <div
                      className={`${
                        active ? "bg-violet-500 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <Link href={item.href}>
                        <a>{item.label}</a>
                      </Link>
                    </div>
                  )}
                </HeadlessMenu.Item>
              ))}
            </div>
          </HeadlessMenu.Items>
        </Transition>
      </HeadlessMenu>
      {children}
    </div>
  );
};

export default Menu;
