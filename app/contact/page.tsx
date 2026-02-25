"use client";

import PageTransition from "@/components/PageTransition";
import SectionWrapper from "@/components/SectionWrapper";
import Ticker from "@/components/Ticker";
import HeroBanner from "@/components/HeroBanner";
import { Panel } from "@/components/ui/Panel";
import Button from "@/components/ui/Button";
import {
  contactDetails,
  contactDetailsContent,
  contactFormContent,
  contactHero,
  contactHours,
  contactImages,
} from "@/data";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Ping = () => (
  <span className="relative h-2.5 w-2.5">
    <span className="absolute inset-0 rounded-full bg-green-300 animate-ping" />
    <span className="absolute inset-0.5 rounded-full bg-green-300" />
  </span>
);
const Badge = ({ children }: { children: React.ReactNode }) => (
  <p className="inline-flex items-center gap-2 rounded-full border border-black/50 px-4 py-1.5 text-sm">
    <Ping />
    {children}
  </p>
);

export default function Contact() {
  return (
    <PageTransition>
      <HeroBanner
        title={contactHero.title}
        breadcrumb={contactHero.breadcrumb}
        image={contactHero.image}
      />
      <Ticker />

      <SectionWrapper fullBleed>
        <Panel className="bg-(--primary-color)">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
            <div className="rounded-3xl bg-white/90 p-8 shadow-sm">
              <Badge>{contactFormContent.label}</Badge>
              <p className="mt-4 type-h2 md:text-3xl font-semibold text-(--primary-color)">
                {contactFormContent.title}
              </p>
              <p className="mt-4 text-sm text-(--text-description)">
                {contactFormContent.description}
              </p>
              <div className="mt-6 grid gap-4">
                {contactFormContent.fields.map((field) => (
                  <input
                    key={field.placeholder}
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm focus:outline-none"
                  />
                ))}
              </div>
              <div className="mt-6">
                <Button label={contactFormContent.cta} type="button" />
              </div>
            </div>

            <div className="relative h-120 overflow-hidden rounded-3xl">
              <div
                className="absolute inset-0 bg-cover"
                style={{ backgroundImage: `url(${contactImages.card})` }}
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-black/60 p-4 type-h5 text-white">
                {contactHours.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between mt-2 first:mt-0"
                  >
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Panel>
      </SectionWrapper>

      <SectionWrapper>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] items-start">
          <div>
            <Badge>{contactDetailsContent.label}</Badge>
            <p className="mt-4 type-h3 font-semibold">
              {contactDetailsContent.title}
            </p>
            <p className="mt-4 text-sm text-(--text-description)">
              {contactDetailsContent.description}
            </p>

            {/* Contact details with icons */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 ">
                <FiMail className="text-(--primary-color) text-2xl" />
                <span className="type-h6">{contactDetails.email}</span>
              </div>
              <div className="flex items-center gap-3 ">
                <FiMapPin className="text-(--primary-color) text-2xl" />
                <span className="type-h6">{contactDetails.location}</span>
              </div>
              <div className="flex items-center gap-3 ">
                <FiPhone className="text-(--primary-color) text-2xl" />
                <span className="type-h6">{contactDetails.phone}</span>
              </div>
            </div>
          </div>
          <div className="h-80 rounded-3xl overflow-hidden">
            <MapContainer
              center={[42.3601, -71.0589]} // Boston coordinates - replace with your location
              zoom={13}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[42.3601, -71.0589]}>
                <Popup>
                  {contactDetails.location}
                  <br />
                  {contactDetails.email}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </SectionWrapper>
    </PageTransition>
  );
}
