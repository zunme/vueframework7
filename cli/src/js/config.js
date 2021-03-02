let config;

if (process.env.NODE_ENV === "production") {
  config = {
    api_url: "https://murflim.run.goorm.io",
	img_url: "https://murflim.run.goorm.io/storage/",
  };
} else {
  config = {
    api_url: "https://murflim.run.goorm.io",
	img_url: "https://murflim.run.goorm.io/storage/",
  };
}

export { config }