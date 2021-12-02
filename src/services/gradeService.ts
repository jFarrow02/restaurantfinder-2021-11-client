import GradeInterface from "../models/GradeInterface";

const GradeService = {

    async getGradesByRestaurantId(restaurantId: string): Promise<GradeInterface[]> {
        return [];
    },

    async createGradeForRestaurant(restaurantId: string, grade: GradeInterface): Promise<GradeInterface> {
        return grade;
    },
};

export default GradeService;