"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Megaphone,
  Calendar,
  Users,
  FileText,
  Building2,
  Settings,
  HelpCircle,
  X,
  User,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

// Types
type MenuItem = {
  icon?: React.ElementType;
  label: string;
  href?: string;
  badge?: number;
  children?: MenuItem[];
};

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface FlyoutState {
  item: MenuItem | null;
  position: { top: number; left: number } | null;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();
  const [showWelcome, setShowWelcome] = useState(true);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [flyout, setFlyout] = useState<FlyoutState>({ item: null, position: null });
  const flyoutRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Toggle submenus
  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  // Show flyout for collapsed sidebar
  const showFlyout = (item: MenuItem, iconElement: HTMLDivElement) => {
    if (!item.children || item.children.length === 0) return;

    const rect = iconElement.getBoundingClientRect();
    setFlyout({
      item,
      position: {
        top: rect.top,
        left: rect.right + 8, // 8px gap from sidebar
      },
    });
  };

  // Hide flyout
  const hideFlyout = () => {
    setFlyout({ item: null, position: null });
  };

  // Close flyout on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        hideFlyout();
      }
    };

    if (flyout.item) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [flyout.item]);

  // Close flyout when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        flyoutRef.current &&
        !flyoutRef.current.contains(e.target as Node) &&
        !Object.values(iconRefs.current).some((ref) => ref?.contains(e.target as Node))
      ) {
        hideFlyout();
      }
    };

    if (flyout.item) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [flyout.item]);

  const menuItems: MenuItem[] = [
    { icon: BarChart3, label: "Dashboard", href: "/admin/dashboard" },
    { icon: Megaphone, label: "Promotions", href: "/admin/promotions" },
    { icon: Calendar, label: "Appointments", href: "/admin/appointments" },
    { icon: Settings, label: "Services", href: "/admin/services" },
    {
      icon: Users,
      label: "Doctors",
      children: [
        { label: "All Doctors", href: "/admin/doctors" },
        { label: "Unavailable Slots", href: "/admin/doctors/unavailable" },
      ],
    },
  ];

  // Recursive render for nested menu items (when sidebar is open)
  const renderMenuItems = (items: MenuItem[], depth = 0) => {
    return items.map(({ icon: Icon, label, href, badge, children }) => {
      const isActive = pathname === href;
      const isOpen = openMenus[label];
      const hasChildren = children && children.length > 0;

      return (
        <div key={label} className="w-full">
          {href ? (
            <Link
              href={href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors w-full ${isActive
                ? "bg-gradient-to-r from-red-500 to-blue-500 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              {Icon && <Icon className="w-5 h-5" />}
              <span>{label}</span>
              {badge && (
                <span className="ml-auto w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {badge}
                </span>
              )}
            </Link>
          ) : (
            <button
              onClick={() => hasChildren && toggleMenu(label)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors w-full ${isOpen ? "bg-gray-100 text-gray-800" : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              {Icon && <Icon className="w-5 h-5" />}
              <span>{label}</span>
              <ChevronRight
                className={`w-4 h-4 ml-auto transform transition-transform ${isOpen ? "rotate-90" : ""
                  }`}
              />
            </button>
          )}

          {/* Render children recursively */}
          {hasChildren && isOpen && (
            <div className="ml-6 mt-1 space-y-1 border-l border-gray-200 pl-3">
              {renderMenuItems(children, depth + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  // Render icons only (when sidebar is closed)
  const renderIconsOnly = (items: MenuItem[]) => {
    return items.map((item) => {
      const { icon: Icon, label, href, badge, children } = item;
      const isActive = pathname === href || (href && pathname.startsWith(href));
      const hasChildren = children && children.length > 0;
      const isChildActive = hasChildren && children.some(child => child.href && pathname.startsWith(child.href));

      return (
        <div key={label} className="w-full flex justify-center" title={label}>
          {href ? (
            <Link
              href={href}
              className={`relative p-3 rounded-xl transition-colors ${isActive
                ? "bg-gradient-to-r from-red-500 to-blue-500 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              {Icon && <Icon className="w-5 h-5" />}
              {badge && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {badge}
                </span>
              )}
            </Link>
          ) : (
            <div
              ref={(el) => { iconRefs.current[label] = el; }}
              tabIndex={0}
              role="button"
              aria-label={label}
              aria-haspopup={hasChildren ? "true" : undefined}
              onMouseEnter={(e) => hasChildren && showFlyout(item, e.currentTarget)}
              onMouseLeave={() => hasChildren && hideFlyout()}
              onFocus={(e) => hasChildren && showFlyout(item, e.currentTarget)}
              onBlur={() => hasChildren && hideFlyout()}
              onClick={(e) => hasChildren && showFlyout(item, e.currentTarget)}
              className={`relative p-3 rounded-xl transition-colors cursor-pointer ${isChildActive
                ? "bg-gray-100 text-gray-800"
                : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              {Icon && <Icon className="w-5 h-5" />}
              {hasChildren && (
                <ChevronRight className="w-3 h-3 absolute bottom-1 right-1 text-gray-400" />
              )}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <>
      <aside
        className={`fixed left-0 top-0 h-screen bg-white shadow-md transition-all duration-300 z-20 ${isOpen ? "w-64" : "w-20"
          }`}
      >
        {/* Logo */}
        <div className={`p-6 border-b border-gray-100 flex items-center ${isOpen ? "space-x-3" : "justify-center"}`}>
          <div className="relative">
            <img
              src="/logo/klinik-mekar-logo-only.png"
              alt="Klinik Mekar Logo"
              className="w-10 h-10 transition-transform duration-300"
            />
          </div>
          {isOpen && <span className="font-bold text-xl text-gray-800">Klinik Mekar</span>}
        </div>

        {/* Welcome message (only when open) */}
        {/* {isOpen && showWelcome && (
          <div className="m-4 p-4 bg-gradient-to-br from-blue-50 to-red-50 rounded-xl relative">
            <button
              onClick={() => setShowWelcome(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-red-500 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">Good Morning,</h3>
                <p className="font-bold text-lg text-gray-900">Lord Commander!</p>
                <p className="text-xs text-gray-600 mt-1">2 appointments</p>
              </div>
            </div>
          </div>
        )} */}

        {/* Navigation */}
        <nav className="mt-4 space-y-1 px-4 flex-1 overflow-y-auto">
          {isOpen ? renderMenuItems(menuItems) : renderIconsOnly(menuItems)}
        </nav>

        {/* Footer */}
        {/* <div className={`px-4 mt-8 pt-4 border-t border-gray-100 space-y-2 pb-4 ${!isOpen && "flex flex-col items-center"}`}>
          <Link
            href="/admin/settings"
            className={`flex items-center ${isOpen ? "space-x-3 px-4" : "justify-center"} py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors`}
            title="Settings"
          >
            <Settings className="w-5 h-5" />
            {isOpen && <span>Settings</span>}
          </Link>
          <Link
            href="/admin/help"
            className={`flex items-center ${isOpen ? "space-x-3 px-4" : "justify-center"} py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors`}
            title="Help"
          >
            <HelpCircle className="w-5 h-5" />
            {isOpen && <span>Help</span>}
          </Link>
        </div> */}
      </aside>

      {/* Flyout Panel (for collapsed sidebar with nested items) */}
      {!isOpen && flyout.item && flyout.position && (
        <div
          ref={flyoutRef}
          className="fixed bg-white shadow-xl rounded-lg border border-gray-200 py-2 px-1 min-w-[200px] z-30"
          style={{
            top: `${flyout.position.top}px`,
            left: `${flyout.position.left}px`,
          }}
          onMouseEnter={() => setFlyout(flyout)}
          onMouseLeave={hideFlyout}
        >
          {/* Left-pointing caret */}
          <div
            className="absolute left-0 top-4 w-0 h-0 -ml-2"
            style={{
              borderTop: "8px solid transparent",
              borderBottom: "8px solid transparent",
              borderRight: "8px solid white",
            }}
          />

          {/* Flyout Header */}
          <div className="px-3 py-2 border-b border-gray-100 flex items-center space-x-2">
            {flyout.item.icon && <flyout.item.icon className="w-4 h-4 text-gray-600" />}
            <span className="font-semibold text-gray-800 text-sm">{flyout.item.label}</span>
          </div>

          {/* Flyout Items */}
          <div className="py-1">
            {flyout.item.children?.map((child) => {
              const isActive = pathname === child.href;
              return (
                <Link
                  key={child.href}
                  href={child.href!}
                  onClick={hideFlyout}
                  className={`block px-4 py-2 rounded-md mx-2 my-1 transition-colors text-sm ${isActive
                    ? "bg-gradient-to-r from-red-500 to-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {child.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}