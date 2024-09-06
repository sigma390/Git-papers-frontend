import pdpf from '../../assets/myImg.jpeg';

const AboutDevs = () => {
  return (
    <div className='m-10 flex flex-col justify-center items-center'>
      {/* Heading for About our Developers */}
      <h1 className='text-4xl font-bold mb-10 text-center'>
        About Our Developers
      </h1>

      {/* Container for Cards */}
      <div className='flex flex-wrap justify-center gap-8 mt-8'>
        {/* Card for Pranav Deshpande */}
        <div className='w-full max-w-xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col sm:flex-row'>
          {/* Image on the left */}
          <figure className='w-full sm:w-1/3 flex-shrink-0'>
            <img
              src={pdpf}
              alt='Pranav Profile Photo'
              className='w-full h-full object-cover'
            />
          </figure>

          {/* Information on the right */}
          <div className='p-6 flex flex-col justify-center'>
            <h2 className='text-2xl font-semibold mb-2 text-gray-800'>
              Omkar Patil
            </h2>
            <p className='text-gray-600'>
              Passionate Computer Science Engineer, currently looking for a
              Career Opportunity with a keen interest in solving challenging
              problems and developing innovative solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutDevs;
