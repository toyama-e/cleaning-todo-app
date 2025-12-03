class CreateCleaningAreas < ActiveRecord::Migration[8.1]
  def change
    create_table :cleaning_areas do |t|
      t.string :name
      t.string :status

      t.timestamps
    end
  end
end
