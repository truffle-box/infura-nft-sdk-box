import React from "react";
import { ProGallery } from "pro-gallery";
import 'pro-gallery/dist/statics/main.css';

const ProGalleryView = () => {
  // Add your images here...
  const items = [
    { // Image item:
      itemId: 'sample-id',
      mediaUrl: 'https://i.picsum.photos/id/674/200/300.jpg?hmac=kS3VQkm7AuZdYJGUABZGmnNj_3KtZ6Twgb5Qb9ITssY',
      metaData: {
        type: 'image',
        height: 200,
        width: 100,
        title: 'sample-title',
        description: 'sample-description',
        focalPoint: [0, 0],
        link: {
          url: 'http://example.com',
          target: '_blank'
        },
      }
    },
    { // Another Image item:
      itemId: 'differentItem',
      mediaUrl: 'https://i.picsum.photos/id/1003/1181/1772.jpg?hmac=oN9fHMXiqe9Zq2RM6XT-RVZkojgPnECWwyEF1RvvTZk',
      metaData: {
        type: 'image',
        height: 200,
        width: 100,
        title: 'sample-title',
        description: 'sample-description',
        focalPoint: [0, 0],
        link: {
          url: 'http://example.com',
          target: '_blank'
        },
      }
    },
    { // HTML item:
      itemId: 'htmlItem',
      html: "<div style='width: 300px; height: 200px; background:pink;'>I am a text block</div>",
      metadata: {
        type: "text",
        height: 200,
        width: 300,
        title: 'sample-title',
        description: 'sample-description',
        backgroundColor: 'pink'
      },

    },
  ]


  // The options of the gallery (from the playground current state)
  const options = {
    galleryLayout: 2,
    titlePlacement: 'SHOW_BELOW',
    // hoveringBehaviour: 'NO_CHANGE',
    // imageInfoType: 'SEPARATED_BACKGROUND',
  };

  // The size of the gallery container. The images will fit themselves in it
  const container = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  // The eventsListener will notify you anytime something has happened in the gallery.
  const eventsListener = (eventName, eventData) => console.log({eventName, eventData});

  // The scrollingElement is usually the window, if you are scrolling inside another element, suplly it here
  return (
    <ProGallery
      items={items}
      options={options}
      container={container}
      eventsListener={eventsListener}
      scrollingElement={window}
    />
  );
};

export default ProGalleryView;
