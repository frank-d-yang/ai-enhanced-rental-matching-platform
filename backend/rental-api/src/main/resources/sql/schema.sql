-- =========================================
-- AI Rental Platform - PostgreSQL Schema
-- =========================================

-- 建议先连接到 rental_db 后，再执行本文件
-- 例如：
-- CREATE DATABASE rental_db;
-- \c rental_db;


-- =========================================
-- Drop old tables (for rebuild in dev stage)
-- =========================================

DROP TABLE IF EXISTS property_image CASCADE;
DROP TABLE IF EXISTS property_amenity CASCADE;
DROP TABLE IF EXISTS booking CASCADE;
DROP TABLE IF EXISTS amenity CASCADE;
DROP TABLE IF EXISTS property CASCADE;
DROP TABLE IF EXISTS app_user CASCADE;


-- =========================================
-- app_user
-- =========================================

CREATE TABLE app_user (
                          id BIGSERIAL PRIMARY KEY,
                          username VARCHAR(50) NOT NULL UNIQUE,
                          email VARCHAR(100) NOT NULL UNIQUE,
                          password_hash VARCHAR(255) NOT NULL,
                          role VARCHAR(20) NOT NULL DEFAULT 'TENANT',
                          status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
                          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                          CONSTRAINT chk_app_user_role
                              CHECK (role IN ('TENANT', 'LANDLORD', 'ADMIN')),

                          CONSTRAINT chk_app_user_status
                              CHECK (status IN ('ACTIVE', 'DISABLED'))
);


-- =========================================
-- property
-- =========================================

CREATE TABLE property (
                          id BIGSERIAL PRIMARY KEY,
                          owner_id BIGINT NOT NULL,
                          title VARCHAR(255) NOT NULL,
                          description TEXT,
                          address_line1 VARCHAR(255) NOT NULL,
                          address_line2 VARCHAR(255),
                          city VARCHAR(100) NOT NULL,
                          state VARCHAR(100),
                          country VARCHAR(100) NOT NULL DEFAULT 'Australia',
                          postcode VARCHAR(20),
                          property_type VARCHAR(30) NOT NULL DEFAULT 'APARTMENT',
                          price_per_week NUMERIC(10,2) NOT NULL,
                          bedrooms INTEGER NOT NULL DEFAULT 1,
                          bathrooms NUMERIC(3,1) NOT NULL DEFAULT 1.0,
                          parking_spaces INTEGER NOT NULL DEFAULT 0,
                          available_from DATE,
                          available_to DATE,
                          status VARCHAR(20) NOT NULL DEFAULT 'DRAFT',
                          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                          CONSTRAINT fk_property_owner
                              FOREIGN KEY (owner_id)
                                  REFERENCES app_user(id)
                                  ON DELETE CASCADE,

                          CONSTRAINT chk_property_price_per_week
                              CHECK (price_per_week >= 0),

                          CONSTRAINT chk_property_bedrooms
                              CHECK (bedrooms >= 0),

                          CONSTRAINT chk_property_bathrooms
                              CHECK (bathrooms >= 0),

                          CONSTRAINT chk_property_parking_spaces
                              CHECK (parking_spaces >= 0),

                          CONSTRAINT chk_property_type
                              CHECK (property_type IN ('APARTMENT', 'HOUSE', 'STUDIO', 'TOWNHOUSE', 'ROOM')),

                          CONSTRAINT chk_property_status
                              CHECK (status IN ('DRAFT', 'PUBLISHED', 'RENTED', 'INACTIVE'))
);


-- =========================================
-- booking
-- =========================================

CREATE TABLE booking (
                         id BIGSERIAL PRIMARY KEY,
                         property_id BIGINT NOT NULL,
                         tenant_id BIGINT NOT NULL,
                         start_date DATE NOT NULL,
                         end_date DATE NOT NULL,
                         status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
                         message TEXT,
                         created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                         updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                         CONSTRAINT fk_booking_property
                             FOREIGN KEY (property_id)
                                 REFERENCES property(id)
                                 ON DELETE CASCADE,

                         CONSTRAINT fk_booking_tenant
                             FOREIGN KEY (tenant_id)
                                 REFERENCES app_user(id)
                                 ON DELETE CASCADE,

                         CONSTRAINT chk_booking_status
                             CHECK (status IN ('PENDING', 'CONFIRMED', 'REJECTED', 'CANCELLED')),

                         CONSTRAINT chk_booking_dates
                             CHECK (end_date > start_date)
);


-- =========================================
-- amenity
-- =========================================

CREATE TABLE amenity (
                         id BIGSERIAL PRIMARY KEY,
                         name VARCHAR(100) NOT NULL UNIQUE
);


-- =========================================
-- property_amenity
-- =========================================

CREATE TABLE property_amenity (
                                  property_id BIGINT NOT NULL,
                                  amenity_id BIGINT NOT NULL,

                                  PRIMARY KEY (property_id, amenity_id),

                                  CONSTRAINT fk_property_amenity_property
                                      FOREIGN KEY (property_id)
                                          REFERENCES property(id)
                                          ON DELETE CASCADE,

                                  CONSTRAINT fk_property_amenity_amenity
                                      FOREIGN KEY (amenity_id)
                                          REFERENCES amenity(id)
                                          ON DELETE CASCADE
);


-- =========================================
-- property_image
-- =========================================

CREATE TABLE property_image (
                                id BIGSERIAL PRIMARY KEY,
                                property_id BIGINT NOT NULL,
                                image_url TEXT NOT NULL,
                                is_cover BOOLEAN NOT NULL DEFAULT FALSE,
                                sort_order INTEGER NOT NULL DEFAULT 0,
                                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                                CONSTRAINT fk_property_image_property
                                    FOREIGN KEY (property_id)
                                        REFERENCES property(id)
                                        ON DELETE CASCADE,

                                CONSTRAINT chk_property_image_sort_order
                                    CHECK (sort_order >= 0)
);


-- =========================================
-- Indexes
-- =========================================

CREATE INDEX idx_property_owner_id
    ON property(owner_id);

CREATE INDEX idx_property_city
    ON property(city);

CREATE INDEX idx_property_status
    ON property(status);

CREATE INDEX idx_booking_property_id
    ON booking(property_id);

CREATE INDEX idx_booking_tenant_id
    ON booking(tenant_id);

CREATE INDEX idx_booking_status
    ON booking(status);

CREATE INDEX idx_property_image_property_id
    ON property_image(property_id);


-- =========================================
-- Seed data for amenity
-- =========================================

INSERT INTO amenity (name) VALUES
                               ('WiFi'),
                               ('Air Conditioning'),
                               ('Heating'),
                               ('Parking'),
                               ('Laundry'),
                               ('Kitchen'),
                               ('Furnished'),
                               ('Pet Friendly')
    ON CONFLICT (name) DO NOTHING;