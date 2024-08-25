import { subscribe } from "@parcel/watcher";
import config from "./config.toml";

const directoriesToWatch = config["artifacts_directory"].path;
const excelExtensions = config["extensions_to_watch"];

console.log(directoriesToWatch, excelExtensions);

async function watchExcelFiles() {
  console.log(`Watching for changes in Excel files in ${directoriesToWatch}`);

  const subscription = await subscribe(
    directoriesToWatch,
    (err, events) => {
      if (err) {
        console.error("Error:", err);
        return;
      }

      events.forEach((event) => {
        const { path, type } = event;
        const ext = path.slice(path.lastIndexOf("."));

        if (excelExtensions.includes(ext)) {
          console.log(`${type} event detected for Excel file: ${path}`);
          // Add your custom logic here, e.g., trigger a function to process the changed file
        }
      });
    },
    {
      ignore: ["node_modules/**"],
    }
  );

  // To stop watching (if needed):
  // await subscription.unsubscribe();
}

watchExcelFiles().catch(console.error);
