export type SidebarItem = {
  title: string;
  url: string;
  items?: SidebarItem[];
};

export type Crumb = {
  label: string;
  href: string;
};

export function findBreadcrumbPath(
  items: SidebarItem[],
  url: string,
  path: Crumb[] = []
): Crumb[] | null {
  for (const item of items) {
    const current = [...path, { label: item.title, href: item.url }];

    // ✅ kalau persis match → return
    if (item.url === url) {
      return current;
    }

    // ✅ kalau punya anak → cari di dalam dulu
    if (item.items) {
      const found = findBreadcrumbPath(item.items, url, current);
      if (found) return found;
    }

    // ✅ kalau prefix match (misalnya /applicants/123)
    if (url.startsWith(item.url + "/")) {
      // tambahkan crumb dinamis untuk /details atau /records
      if (url.includes("/details")) {
        return [...current, { label: "Detail", href: url }];
      }
      if (url.includes("/records")) {
        return [...current, { label: "Records", href: url }];
      }

      return current;
    }
  }
  return null;
}
