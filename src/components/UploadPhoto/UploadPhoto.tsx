import { useState, type ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import type { UploadPhotoProps } from './interfaces/UploadPhotoProps';

const UploadPhoto = ({ setFieldValue }: UploadPhotoProps) => {
  const { t } = useTranslation();
  const [preview, setPreview] = useState<string | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFieldValue('photo', file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div>
      <div className={clsx('upload-photo__box', preview && 'upload-photo__box--borderless')}>
        {preview ? (
          <img
            src={preview}
            alt="Recipe preview"
            className="object-cover w-full h-full rounded-xl"
          />
        ) : (
          <label className="upload-photo__label">
            <input type="file" className="upload-photo__hidden" onChange={onChange} />
            <svg className="upload-photo__icon">
              <use href="/images/icons.svg#icon-photocamera" />
            </svg>
            <span>{t('components.uploadPhoto.upload')}</span>
          </label>
        )}
      </div>
      {preview ? (
        <label className="upload-photo__another">
          <input type="file" className="upload-photo__hidden" onChange={onChange} />
          <span>{t('components.uploadPhoto.uploadAnother')}</span>
        </label>
      ) : null}
    </div>
  );
};

export default UploadPhoto;
