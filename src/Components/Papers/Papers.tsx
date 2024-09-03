import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { FaShare } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { MdDelete, MdDownload, MdOutlineCancel } from 'react-icons/md';

import { useLocation, useNavigate } from 'react-router-dom';
import pdfLogo from '../../assets/pdf-svgrepo-com.svg';

interface Paper {
  id: string;
  title: string;
  uploadedAt: Date;
  description: string;
  viewLink: string;
  downLoadLink: string;
  driveId: string;
}

const Papers: React.FC = () => {
  const location = useLocation();
  const [papers, setPapers] = useState<Paper[]>([]);
  const [showUploadCard, setShowUploadCard] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<Paper | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const navigate = useNavigate();
  const baseURL = 'http://localhost:3000/faculty';
  const queryParams = new URLSearchParams(location.search);
  const scheme = queryParams.get('scheme');
  const exam = queryParams.get('exam');

  const fetchPapers = useCallback(async () => {
    try {
      const response = await axios.get<Paper[]>(`${baseURL}/papers`, {
        params: {
          scheme,
          exam, // Add this line to include the 'exam' parameter
        },
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPapers(response.data);
    } catch (error) {
      console.error('Error fetching papers:', error);
    }
  }, [scheme, exam]); // Add 'exam' to the dependency array

  useEffect(() => {
    fetchPapers();
  }, [scheme, exam, fetchPapers]); // Add 'exam' to the dependency array

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    if (scheme && exam) {
      formData.append('scheme', scheme);
      formData.append('exam', exam);
      console.log(exam);
    }

    try {
      await axios.post(`${baseURL}/upload`, formData, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const progress = Math.floor((loaded / total!) * 100);
          setUploadProgress(progress);
        },
      });

      // Clear form data
      setFile(null); // Reset file state

      // Reset the file input element
      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      fetchPapers();
      setShowUploadCard(false);
      setUploadProgress(0); // Reset progress
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const confirmDelete = (id: any) => {
    setFileToDelete(id);
    setShowDeleteConfirmation(true);
  };

  function handleDash() {
    navigate('/tests');
  }

  const handleDelete = async () => {
    if (!fileToDelete) {
      return;
    }

    try {
      await axios.delete(`${baseURL}/papers/${fileToDelete}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      fetchPapers();
    } catch (error) {
      console.error('Error deleting file:', error);
    } finally {
      setShowDeleteConfirmation(false);
      setFileToDelete(null);
    }
  };

  return (
    <>
      <div className='flex justify-between mr-16 ml-16 mt-10'>
        <h2 className='font-semibold'>Papers for Scheme: {scheme}</h2>
        {localStorage.userType === 'admin' && (
          <button onClick={handleDash} className='btn btn-primary'>
            Show Dashboard
          </button>
        )}
        {(localStorage.userType === 'faculty' ||
          localStorage.userType === 'admin') && (
          <button
            className='btn btn-neutral'
            onClick={() => setShowUploadCard(true)}
            aria-label='Upload Paper'
          >
            Upload <FiUpload />
          </button>
        )}
      </div>

      <div className='shadow-lg shadow-slate-400 p-10 mt-10 h-full grid grid-cols gap-4 grid-cols-5 m-16'>
        {papers.map((paper) => (
          <div
            key={paper.id}
            className='card hover:scale-105 duration-200 w-40 bg-base-100 shadow-xl'
          >
            <a
              className='text-lg'
              href={paper.viewLink}
              rel='noopener noreferrer'
            >
              <figure>
                <img src={pdfLogo} alt='PDF Logo' />
              </figure>
            </a>
            <div className='w-40 p-2'>
              <p className='text-xs text-center break-words'>{paper.title}</p>
            </div>
            <div className='flex justify-evenly p-2'>
              <a
                className='text-lg'
                href={paper.downLoadLink}
                rel='noopener noreferrer'
              >
                <MdDownload />
              </a>
              <a
                className='text-lg'
                href={paper.viewLink}
                rel='noopener noreferrer'
              >
                <FaShare />
              </a>
              {(localStorage.userType === 'faculty' ||
                localStorage.userType === 'admin') && (
                <button
                  className='text-lg'
                  onClick={() => confirmDelete(paper.driveId)}
                >
                  <MdDelete />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showUploadCard && (
        <div className='overlay fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50'>
          <div className='card bg-white p-5 rounded-lg shadow-lg'>
            <div className='flex justify-between'>
              <h3 className='font-semibold text-lg mb-4'>Upload Paper</h3>
              <button
                type='button'
                onClick={() => setShowUploadCard(false)}
                className='text-xl'
              >
                <MdOutlineCancel />
              </button>
            </div>

            <form onSubmit={handleUpload}>
              <input
                type='file'
                onChange={handleFileChange}
                className='file-input file-input-bordered w-full max-w-xs'
                aria-label='Choose file'
              />
              <div className='flex justify-center p-2'>
                <button
                  type='submit'
                  className='btn btn-neutral'
                  aria-label='Upload'
                >
                  Upload <FiUpload />
                </button>
              </div>

              {uploadProgress > 0 && (
                <div className='progress-bar-container w-full mt-2'>
                  <div
                    className='progress w-56 bg-blue-500 h-4'
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirmation && (
        <div className='overlay fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50'>
          <div className='card bg-white p-5 rounded-lg shadow-lg'>
            <div className='flex justify-between'>
              <h3 className='font-semibold text-lg mb-4'>Confirm Delete</h3>
              <button
                type='button'
                onClick={() => setShowDeleteConfirmation(false)}
                className='text-xl'
              >
                <MdOutlineCancel />
              </button>
            </div>
            <p>Are you sure you want to delete this file?</p>
            <div className='flex justify-center mt-4'>
              <button
                className='btn btn-neutral mr-4'
                onClick={() => setShowDeleteConfirmation(false)}
              >
                Cancel
              </button>
              <button
                className='btn btn-danger'
                onClick={handleDelete}
                aria-label='Delete'
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Papers;
