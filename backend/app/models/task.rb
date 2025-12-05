class Task < ApplicationRecord
  belongs_to :cleaning_area
  belongs_to :user
end
