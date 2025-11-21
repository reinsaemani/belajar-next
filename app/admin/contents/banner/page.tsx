import { BannerView } from "@/features/contents/banner/component/banner-view";

export default function ContentBannerPage() {
  return (
    <section className="p-4 bg-white rounded-xl shadow mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Banners</h1>
      <BannerView />
    </section>
  );
}
