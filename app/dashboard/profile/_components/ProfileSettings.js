"use client";
import { useState } from "react";
import styles from '../userProfile.module.css';
import { Bell, Moon, Globe, ShieldCheck, Mail } from "lucide-react";

const ProfileSettings = ({ userData }) => {
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    notifications: true,
    darkMode: false,
    language: "en",
    twoFactorAuth: false,
    newsletter: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the updated data to your backend
    console.log("Updated settings:", formData);
    // Show success message to user
    alert("Settings updated successfully!");
  };

  return (
    <div className={styles.settingsContainer}>
      <h3 className={styles.settingsTitle}>Account Settings</h3>

      <form onSubmit={handleSubmit} className={styles.settingsForm}>
        <div className={styles.formSection}>
          <h4 className={styles.sectionTitle}>Personal Information</h4>

          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className={styles.formInput}
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={styles.formInput}
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className={styles.formInput}
              placeholder="••••••••••"
              onChange={handleChange}
            />
            <span className={styles.helpText}>
              Leave blank to keep current password
            </span>
          </div>
        </div>

        <div className={styles.formSection}>
          <h4 className={styles.sectionTitle}>Preferences</h4>

          <div className={styles.preferenceItem}>
            <div className={styles.preferenceInfo}>
              <Bell size={18} className={styles.preferenceIcon} />
              <span className={styles.preferenceName}>Notifications</span>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                name="notifications"
                checked={formData.notifications}
                onChange={handleChange}
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          <div className={styles.preferenceItem}>
            <div className={styles.preferenceInfo}>
              <Moon size={18} className={styles.preferenceIcon} />
              <span className={styles.preferenceName}>Dark Mode</span>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                name="darkMode"
                checked={formData.darkMode}
                onChange={handleChange}
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          <div className={styles.preferenceItem}>
            <div className={styles.preferenceInfo}>
              <Globe size={18} className={styles.preferenceIcon} />
              <span className={styles.preferenceName}>Language</span>
            </div>
            <select
              name="language"
              value={formData.language}
              onChange={handleChange}
              className={styles.selectInput}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>

          <div className={styles.preferenceItem}>
            <div className={styles.preferenceInfo}>
              <ShieldCheck size={18} className={styles.preferenceIcon} />
              <span className={styles.preferenceName}>
                Two-factor Authentication
              </span>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                name="twoFactorAuth"
                checked={formData.twoFactorAuth}
                onChange={handleChange}
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          <div className={styles.preferenceItem}>
            <div className={styles.preferenceInfo}>
              <Mail size={18} className={styles.preferenceIcon} />
              <span className={styles.preferenceName}>Newsletter</span>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.saveButton}>
            Save Changes
          </button>
          <button type="button" className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
