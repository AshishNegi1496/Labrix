import { test } from "node:test";
import assert from "node:assert/strict";
import { appConfig } from "../config/app-config";
import { footerData } from "../data/footer";
import { navigation } from "../data/navigation";
import { siteMeta } from "../data/site";
import {
  aboutHero,
  aboutStoryCards,
  blogHero,
  blogPosts,
  caseStudies,
  galleryCategories,
  galleryCopy,
  galleryItems,
  contactDetails,
  contactHero,
  faqs,
  featureCards,
  homeImages,
  researchFields,
  teamMembers,
  servicesHero,
  servicesList,
  servicesStats,
  testimonials,
  whatWeDoData,
} from "../data";

test("app config has a valid environment", () => {
  assert.ok(["development", "staging", "production"].includes(appConfig.env));
});

test("site metadata is populated", () => {
  assert.ok(siteMeta.name.length > 0);
  assert.ok(siteMeta.description.length > 0);
  assert.ok(siteMeta.url.length > 0);
});

test("navigation and footer data are present", () => {
  assert.ok(navigation.items.length > 0);
  assert.ok(footerData.quickLinks.length > 0);
  assert.ok(footerData.services.length > 0);
});

test("page data collections are populated", () => {
  assert.ok(aboutHero.title.length > 0);
  assert.ok(aboutStoryCards.length > 0);
  assert.ok(blogHero.title.length > 0);
  assert.ok(blogPosts.length > 0);
  assert.ok(contactHero.title.length > 0);
  assert.ok(featureCards.length > 0);
  assert.ok(researchFields.length > 0);
  assert.ok(caseStudies.length > 0);
  assert.ok(faqs.length > 0);
  assert.ok(testimonials.length > 0);
  assert.ok(servicesHero.title.length > 0);
  assert.ok(servicesList.length > 0);
  assert.ok(servicesStats.length > 0);
  assert.ok(whatWeDoData.items.length > 0);
  assert.ok(teamMembers.length > 0);
  assert.ok(galleryCategories.length > 0);
  assert.ok(galleryItems.length > 0);
  assert.ok(galleryCopy.emptyState.length > 0);
  assert.ok(homeImages.hero.length > 0);
});

test("contact details are consistent", () => {
  assert.ok(contactDetails.email.includes("@"));
  assert.ok(contactDetails.phone.length > 0);
});
