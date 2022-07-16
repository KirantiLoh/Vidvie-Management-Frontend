import styles from './Items.module.css'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import ImageContainer from '@components/ImageContainer/ImageContainer'
import NoImageAvailable from '@public/no-image-available.png'

const Items = ({items, isLeader, setRefetching}) => {

    const changeItemCondition = async (e, item) => {
      e.preventDefault()
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stocks/${item.id}`,
      {"name": item.name, "condition": e.target.value, "function": item.function, "stock": item.stock, "broken": item.broken})
      setRefetching(true)
    }

    const setConditionColor = (condition) => {
      if (condition === 'Bad') return 'var(--status-not-started-background-color)'
      if (condition === 'Second') return 'var(--status-in-progress-background-color)'
      if (condition === 'Good') return 'var(--status-finished-background-color)' 
    }

  return (
    <>
    <ul className={styles.items}>
    {items.map((item, index) => {
        return (
            <li key={index}>
              <ImageContainer width={80} height={80}>
                  <Image src={item.image ?`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_BUCKET}/${item.image}` : NoImageAvailable} alt={item.name} layout='fill' style={{borderRadius: '50%'}}/> 
              </ImageContainer>
                <div className={styles.item}>
                    <div className={styles.upperDetail}>
                        <h3 className={styles.itemTitle}>
                          <Link href={`/stocks/${item.id}`}>
                            <a>
                            {item.name}
                            </a>
                          </Link>
                        </h3>
                        {isLeader ? 
                        <select required style={{backgroundColor: setConditionColor(item.condition), border: 'none'}} className={styles.condition} value={item.condition} onChange={e => changeItemCondition(e, item)}>
                          <option value="Good">Good</option>
                          <option value="Second">Second</option>
                          <option value="Bad">Bad</option>
                        </select> : 
                        <span style={{backgroundColor: setConditionColor(item.condition)}} className={styles.condition}>{item.condition}</span>
                      }
                    </div>
                    <div className={styles.extraDetails}>
                        <p>Stock : {item.stock}</p>
                        <p>Borrowed : {item.borrowed}</p>
                        <p>Broken : {item.broken}</p>
                        <p>Last Updated : {(new Date(item.date_updated)).toLocaleString()}</p>
                        <p>Date Added : {(new Date(item.date_added)).toLocaleString()}</p>
                    </div>
                </div>
            </li>
        )
    })}
    </ul>
    </>
  )
}

export default Items