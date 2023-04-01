type FileDataURL = string | ArrayBuffer | null;
interface FileReaderResult {
  file: File;
  dataUrl: FileDataURL;
}

export function fileReader(file: File): Promise<FileDataURL> {
  return new Promise<FileDataURL>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject('Load file error');
    };
  });
}

export async function fileListReader(files: File[]): Promise<FileReaderResult[]> {
  const promises: Promise<any>[] = [];
  const fileResults: FileReaderResult[] = [];

  files.forEach((file) => {
    promises.push(
      fileReader(file).then((dataUrl) => {
        fileResults.push({ dataUrl, file });
      })
    );
  });

  await Promise.all(promises);
  return fileResults;
}
