import styles from '../userProfile.module.css';
import { Camera, Edit } from 'lucide-react';

const ProfileHeader = ({ userData }) => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.profileImageContainer}>
        {/* <img 
          src={userData.avatar} 
          alt={`${userData.name}'s profile`} 
          className={styles.profileImage}
        /> */}
        <button className={styles.imageEditButton} aria-label="Change profile picture">
          <Camera size={18} />
        </button>
      </div>
      
      <div className={styles.profileInfo}>
        <div className={styles.nameContainer}>
          <h1 className={styles.userName}>{userData.name}</h1>
          <span className={styles.userRole}>{userData.role}</span>
        </div>
        
        <div className={styles.detailsContainer}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Email:</span>
            <span className={styles.detailValue}>{userData.email}</span>
          </div>
          
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Member since:</span>
            <span className={styles.detailValue}>{userData.joined}</span>
          </div>
          
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Last active:</span>
            <span className={styles.detailValue}>{userData.lastActive}</span>
          </div>
        </div>
        
        <button className={styles.editProfileButton}>
          <Edit size={16} />
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;