import { IconBadge } from '@/components/IconBadge';
import { Info } from 'lucide-react';

const InfoBoard = () => {
  return (
    <div className='flex flex-col gap-8 bg-primary-50 text-sm font-semibold rounded-md p-6 mb-6'>
      <IconBadge icon={Info} className='mx-auto' size={'md'} />
      <p className='text-neutral-500'>
        <span className='text-neutral-800'>Resting Metabolic Rate (RMR): </span>
        Your RMR, also called the Basal Metabolic Rate (BMR), is the minimum
        energy your body requires to maintain vital functions while at rest.
        This represents the calories needed for basic life-sustaining
        activities.
      </p>
      <p className='text-neutral-500'>
        <span className='text-neutral-800'>
          Physical Activity Level (PAL):{' '}
        </span>
        Quantifies daily physical activity and aids in estimating total energy
        expenditure. Together with resting metabolic rate (RMR), it guides daily
        calorie intake for a chosen lifestyle.
      </p>
      <p className='text-neutral-500'>
        <span className='text-neutral-800'>Active Metabolic Rate (AMR): </span>
        AMR accounts for your daily calorie needs, factoring in RMR and the
        calories burned during physical activities and exercise. It&apos;s the
        total energy expenditure in a day.
      </p>
    </div>
  );
};

export default InfoBoard;
