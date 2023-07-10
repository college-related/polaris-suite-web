
interface IFeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard = ({ title, description }: IFeatureCardProps) => {
  return (
    <div>
      <h4 className="text-h4 font-bold text-primary">{title}</h4>
      <p className="text-justify">{description}</p>
    </div>
  )
}

export default FeatureCard