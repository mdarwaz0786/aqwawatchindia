export const generateSchema = ({
  pageName,
  metaTitle,
  metaDescription,
  metaAuthor,
  canonicalUrl,
  imageUrl,
  slug,
  createdAt,
  updatedAt,
}) => {
  const baseUrl = canonicalUrl || "https://www.aquawatchindia.com";

  const pageUrl = slug
    ? `${baseUrl}/${pageName.replace("-detail", "")}/${slug}`
    : pageName === "home"
      ? baseUrl
      : `${baseUrl}/${pageName}`;

  const author = metaAuthor
    ? {
      "@type": "Person",
      name: metaAuthor,
    }
    : {
      "@type": "Organization",
      name: "Aquawatch India",
    };

  const publisher = {
    "@type": "Organization",
    name: "Aquawatch India",
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/logo.jpeg`,
    },
  };

  const imageObject = imageUrl
    ? {
      "@type": "ImageObject",
      url: imageUrl,
    }
    : undefined;

  switch (pageName) {
    /* ---------------- PRODUCT DETAIL ---------------- */
    case "product-detail":
      return {
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": pageUrl,
        name: metaTitle,
        description: metaDescription,
        image: imageObject,
        brand: {
          "@type": "Brand",
          name: "Aquawatch India",
        },
        url: pageUrl,
      };
    /* ---------------- PRODUCT LISTING ---------------- */
    case "products":
      return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": pageUrl,
        name: metaTitle,
        description: metaDescription,
        url: pageUrl,
      };
    /* ---------------- BLOG DETAIL ---------------- */
    case "blog-detail":
      return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": pageUrl,
        headline: metaTitle,
        description: metaDescription,
        image: imageObject,
        author,
        publisher,
        datePublished: createdAt,
        dateModified: updatedAt,
        mainEntityOfPage: pageUrl,
      };
    /* ---------------- BLOG PAGE ---------------- */
    case "blog":
      return {
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": pageUrl,
        name: metaTitle,
        description: metaDescription,
        url: pageUrl,
      };
    /* ---------------- LEGAL PAGES ---------------- */
    case "terms-conditions":
    case "return-refund-policy":
    case "billing-shipping-policy":
    case "privacy-policy":
    case "cookie-policy":
    case "disclaimer":
      return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": pageUrl,
        name: metaTitle,
        description: metaDescription,
        url: pageUrl,
      };
    /* ---------------- USER PAGES ---------------- */
    case "cart":
    case "checkout":
    case "dashboard":
    case "profile":
    case "invoice":
    case "login":
    case "signup":
    case "forgot-password":
    case "become-dealer":
    case "about-us":
    case "contact-us":
      return {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": pageUrl,
        name: metaTitle,
        description: metaDescription,
        url: pageUrl,
      };
    /* ---------------- HOME PAGE ---------------- */
    case "home":
    default:
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": baseUrl,
        name: "Aquawatch India",
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/logo.jpeg`,
        },
      };
  }
};