# Memorial media setup

## Images

The supplied photo archive is a OneDrive folder:

https://1drv.ms/f/c/0C611E8D3ECCD702/Ei4SU4pGo7JLu-Vi6GSR3VEB0R5vkIwBKLEg6j9-Z1iEmw

The link is stored in `src/config/media.js`.

A normal browser React app cannot securely enumerate a OneDrive folder just from a share URL. If the folder is public, individual image URLs can be added to `memorial.photos`. For automatic folder enumeration, connect Microsoft Graph through a server-side/Supabase Edge Function and return the image URLs to React.

## Videos

Both YouTube recordings are configured in `src/config/media.js`:

- QFhyRZfiRnI
- CPZcEnu2Ab4

The Videos page embeds both recordings directly with YouTube's player. The video detail route is `/videos/:videoId`.
